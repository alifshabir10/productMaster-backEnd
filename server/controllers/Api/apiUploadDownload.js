import formidable from 'formidable';
import fs from 'fs';
import IndexCtrl from '../IndexController';


const pathDir = __dirname + '/uploads/';

// console.log(uploadPhoto)
const uploadPhoto = async (req, res) => {

    // cek apakah path directory sudah ada, jika belum create directory
    // uploads dalam root project
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const form = formidable({ multiples: true, uploadDir: pathDir });

    // buat konstan variable files : untuk simpan file image yg dikirim 
    // dari client, dan konstan fields untuk simpan variable employee_id
    // yg dikirim dari client.
    const files = [];
    const fields = [];
    const formData = {
        fields: fields,
        files: files
    }



    form
        .on('fileBegin', (keyName, file) => {
            console.log(keyName, file);
            file.caim_path = pathDir + file.caim_filename;
        })
        .on('field', (keyName, value) => {
            console.log(keyName, value);
            fields.push({ keyName, value });
        })
        .on('file', (keyName, file) => {
            console.log(keyName, file.caim_filename);
            const fileName = file.caim_filename;
            files.push({ keyName, fileName });

        })
        .on('end', () => {
            console.log('-> upload to storage done');
            // sesuaikan dengan model untuk insert data ke table image,
            //kasus untuk miniproject berarti table product_image & category_image
            IndexCtrl.createCateImages.createEmpImages(req, res, formData).then(result => {
                console.log(result);
            })
        });

    form.parse(req);
    res.send("File Uploaded Successfully");
}

const downloadPhoto = async (req, res) => {
    const filename = `${pathDir}/${req.params.image}`
    fs.createReadStream(filename)
        .on('error', () => respondNotFound(req, res))
        .pipe(res)
}

const respondNotFound = (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Image Not Found')
}

const promiseAll = () => {

}


export default {
    uploadPhoto,
    downloadPhoto
}
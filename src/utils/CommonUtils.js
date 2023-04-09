class CommonUtils {

    static getBase64(file) {
        return new Promise(resolve => {
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader);
            };
        });

        // return new Promise((resolve, reject) => {
        //     const reader = new FileReader();
        //     reader.readAsDataURL(file);
        //     reader.onLoad = () => { resolve(reader) };
        //     reader.onerror = error => { reject(error) };
        //     console.log("test getBase64: ", reader);
        // });
    }


}

export default CommonUtils;
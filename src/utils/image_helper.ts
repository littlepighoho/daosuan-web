/**
 * 接受一个file 返回他的base64
 */
export const imageToDataURL = (file: any, callback: (string: string) => void) => {
  let fr = new FileReader();
  fr.readAsDataURL(file);
  fr.onload = (e: any) => {
    callback(e.target.result as string);
  }
};



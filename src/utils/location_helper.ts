// import { APIS } from '@/constant/apis';
//

interface openLinkType {
  targetUrl: string,
  blank: boolean,
}

// export const openLink = ({ targetUrl, blank= true }: openLinkType)  => {
//   window.open(API_BASE + targetUrl, blank ? "_blank" : "");
// };
//

export const queryGenerator = (queryObject: any) => {
  let targetString = "?";
  let count = 0;
  Object.keys(queryObject).forEach((keys) => {
    if(queryObject[keys as string] === undefined) {

    } else if(!count) {
      targetString += (keys + "=" + queryObject[keys as string]) ;
      count++;
    } else {
      targetString += ("&" + keys + "=" + queryObject[keys as string]);
      count++;
    }
  })
  return targetString;
}

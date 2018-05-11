/*jshint esversion: 6 */
import gameLanguage from '../localization/gameLanguage';

const resourceTicketArray = ()=>{
  let result = [];
  for(let r in gameLanguage.en.resource) {
    result.push(
    {
      id: '999_resourceTicket_' + r,
      name: 'resourceTicket_' + r,
      desc: 'resourceTicket_' + r + '_desc',
      quality: 'b',
      type: 'resourceTicket',
      usage: {
        consume: true,
        resource: r,
        amount: 1000,
      }
    });
  }
  return result;
};


const itemData = resourceTicketArray.concat([]);

export default itemData;

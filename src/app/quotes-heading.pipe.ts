import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quotesHeading'
})

// quotesHeadingArr = [
//   {
//     name : "insurer",
//     label : "Insurer"
//   },
//   {
//     name : "quoteRequested",
//     label : "Quote Requested"
//   },
//   {
//     name : "quoteDeclined",
//     label : "Insurer Declined to Quote"
//   },
//   {
//     name : "reasonForDecline",
//     label : "Reason for Decline"
//   },
//   {
//     name : "spCosted",
//     label : "Single Premium Costed Quote"
//   },
//   {
//     name : "unitRate",
//     label : "Unit Rate"
//   },
//   {
//     name : "premium",
//     label : "Premium"
//   },
//   {
//     name : "percentage",
//     label : "Percentage Change in Expiring Unit Rate"
//   },
//   {
//     name : "freeCoverLevel",
//     label : "Free Cover Level"
//   },
//   {
//     name : "singleEventMaximum",
//     label : "Single Event Maximum"
//   },
//   {
//     name : "otherNotes",
//     label : "Other Notes"
//   }
// ]
export class QuotesHeadingPipe implements PipeTransform {

  transform(value: any, quotesHeadingArr :any): any {
    if(value && value!=''){
      quotesHeadingArr.map((item)=>{
        item.name == value
        return item.label
      })
    }
    return null
  }

}

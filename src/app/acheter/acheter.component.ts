import { Component, OnInit } from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';

@Component({
  selector: 'app-acheter',
  templateUrl: './acheter.component.html',
  styleUrls: ['./acheter.component.css']
})
export class AcheterComponent implements OnInit {
  public payPalConfig ? : IPayPalConfig;
  price:string 
  
  constructor() { this.price='7';}

  ngOnInit() {
    this.initConfig();
  }
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'AbOwhO3fifmdmNaxLLLuOoPOFZfsPkUh-i0rI_CMvID2bC_hde29ZfpOIJiYRBjbuTxPY9jqB0y1XMEC',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.price,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.price
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.price,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      //this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}

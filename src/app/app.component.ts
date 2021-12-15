
import { Component, ViewChild, OnInit } from '@angular/core';
import { registerModel } from 'src/model/registrar.model';
import { BarcodeFormat } from '@zxing/library';
import { QrScannerComponent } from 'angular2-qrscanner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent implements OnInit {
  identifier: string = '';
  title = 'app';


  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];
  reModel: registerModel = new registerModel();

  item = [{}];
  qrInfo = JSON.stringify(this.item);
  bandera = 0;



  public values: any;
  public level: "L" | "M" | "Q" | "H";
  public width: number;
  name: any;




  constructor() {

  }
  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;

  ngOnInit(): void {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('front')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
    });
  }
  captureScan(lol) {

  }

  qrData() {
    this.bandera = 1;

    let arr = [];

    arr.push({
      strNombre: this.reModel.strNombre,
      strApePA: this.reModel.strApePA,
      strApeMA: this.reModel.strApeMA,
      strCurp: this.reModel.strCurp,
      strEmail: this.reModel.strEmail,
      numTele: this.reModel.numTele,
      strOrg: this.reModel.strOrg,
      strEstado: this.reModel.strEstado,

    })

    this.item = arr;

    console.log(this.item);

    this.qrInfo = JSON.stringify(this.item);
  }


}





import { Injectable } from '@angular/core';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';


@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {

  constructor( private remoteConfig: AngularFireRemoteConfig ) { }

  getTaskCompletedEnabled() {
    //llAMADO PARA desactivar la funcion de completar el estado de la tarea
    this.remoteConfig.getBoolean('disable_task_completed').then(data =>{
      console.log(data)
    })
    return this.remoteConfig.getBoolean('disable_task_completed');
  }
}

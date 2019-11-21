import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  statusNames:string[];
  projectForm: FormGroup;
  ngOnInit(){
    this.statusNames = ['Stable', 'Critical', 'Finished'];
    this.projectForm = new FormGroup({
      projectData: new FormGroup({
        projectName: new FormControl(null,[Validators.required],this.invalidProjectNameAsync),
        email: new FormControl(null,[Validators.required, Validators.email]),
        status: new FormControl('Stable')
      })
    })
  }

  invalidProjectName=(control: FormControl):{[s:string]:boolean}=>{
    if(control.value==='test'){
      return {'isInvalidProjectName': true}
    }
    return null;
  }

  invalidProjectNameAsync=(control: FormControl):Promise<any> | Observable<any>=>{
    const promise = new Promise((resolve, reject)=>{
      setTimeout(()=>{
        if(control.value==='test'){
          resolve({'isInvalidProjectName': true})
        }
        else{
          resolve(null)
        }
      },1500)
    })
    return promise;
  }

  onSubmit(){
    console.log(this.projectForm)
  }

}

import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/config/config.service';
import { VariablesService } from '../app/services/variablesGL.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: ConfigService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.Usuario){
      console.log("Autenticado");
      return true;
    }else {
      localStorage.clear();
      console.log("No autenticado ");
      if(route.url[0].path == 'mi-informacion' || route.url[0].path == 'mis-nominaciones'|| route.url[0].path == 'mis-lugares'){
        this.router.navigate(['/portal/login'], { replaceUrl: true });
      }else{
        this.router.navigate(['/admin/login'], { replaceUrl: true });
      }


      if( route.url[0].path == 'mis-lugares'){
        this.router.navigate(['/reedevento/login'], { replaceUrl: true });
      }else{
        this.router.navigate(['/reedeventoadmin/login'], { replaceUrl: true });
      }
      
      if(route.url[0].path == 'jueces' || route.url[0].path == 'categorias' || route.url[0].path == 'evaluacion-nominaciones' || route.url[0].path == 'nominaciones' || route.url[0].path == 'mensajes-contacto' || route.url[0].path == 'usuarios'){
        // this.router.navigate(['/portal/login'], { replaceUrl: true });
        this.router.navigate(['/admin/login'], { replaceUrl: true });
      }else{
        this.router.navigate(['/admin/login'], { replaceUrl: true });
      }

      return false;

    }


 
  }

  canLoad(): boolean {
    if (this.authService.Usuario){
      //console.log("Autenticado");
      return true;
    }else {
      localStorage.clear();
      //console.log("No autenticado");
      this.router.navigate(['/portal/login'], { replaceUrl: true });
      return false;
    }
  }

}

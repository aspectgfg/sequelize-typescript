import express = require('express');
import {NotImplementedError} from "../errors/NotImplementedError";
import {WebSocket} from "../websockets/WebSocket";
import {ParametersMissingError} from "../errors/ParametersMissingError";

export abstract class ApiAbstract extends WebSocket {

  constructor() {
    super();
  }

  // REST implementations
  // ===============================

  /**
   * Not implemented method
   */
  createUser(req: express.Request, res: express.Response, next: any): void {

    throw new NotImplementedError();
  }

  /**
   * Not implemented method
   */
  updateUser(req: express.Request, res: express.Response, next: any): void {

    throw new NotImplementedError();
  }

  /**
   * Not implemented method
   */
  convertUser(req: express.Request, res: express.Response, next: any): void {

    throw new NotImplementedError();
  }

  /**
   * Not implemented method
   */
  authUser(req: express.Request, res: express.Response, next: any): void {

    throw new NotImplementedError();
  }

  /**
   * Not implemented method
   */
  createLog(req: express.Request, res: express.Response, next: any): void {

    throw new NotImplementedError();
  }

  /**
   * Not implemented method
   */
  getEVSE(req: express.Request, res: express.Response, next: any): void {

    throw new NotImplementedError();
  }

  /**
   * Not implemented method
   */
  getEVSEs(req: express.Request, res: express.Response, next: any): void {

    throw new NotImplementedError();
  }

  /**
   * Not implemented method
   */
  getChargingLocationEVSEs(req: express.Request, res: express.Response, next: any): void {

    throw new NotImplementedError();
  }

  /**
   * Not implemented method
   */
  getChargingLocation(req: express.Request, res: express.Response, next: any): void {

    throw new NotImplementedError();
  }

  /**
   * Not implemented method
   */
  getChargingLocations(req: express.Request, res: express.Response, next: any): void {

    throw new NotImplementedError();
  }

  /**
   * For versioning of web sockets
   */
  getSocketNamespacePrefix(): string {

    // extract version number from constructor name
    const PREFIX = 'Api';
    const constructor = <any>this.constructor as {name: string};

    return constructor.name.replace(PREFIX, '').toLocaleLowerCase();
  }

  // Middleware implementations
  // ===============================

  /**
   * Not implemented middlewares will be ignored
   */
  checkAuthentication(req: express.Request, res: express.Response, next: any): void {

    next();
  }

  // Helper
  // ===============================

  /**
   * Checks if specified target object has specified parameter keys
   */
  protected hasParameters(target: any, paramKeys: string[]) {

    for (let key of paramKeys) {

      if (!(key in target)) {
        return false;
      }
    }

    return true;
  }
  
  /**
   * Checks if specified target object has specified parameter keys,
   * if not, it throws an ParametersMissingError error;
   * If you specify more than one array of keys, that means, that 
   * only one of these arrays has to be valid
   */
  protected checkRequiredParameters(target: any, ...requiredParamKeys: string[][]) {

    let isValid = false;

    requiredParamKeys.forEach(params => {

      if (this.hasParameters(target, params)) {
        isValid = true;
      }
    });

    if (!isValid) {

      throw new ParametersMissingError(...requiredParamKeys);
    }
  }
  
}


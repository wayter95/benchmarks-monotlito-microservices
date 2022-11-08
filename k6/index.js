import monolitoAuthentication from "./scenarios/monolito/monolito-authentication.js";
import monolitoManager from "./scenarios/monolito/monolito-manager.js";
import monolitoCustomer from "./scenarios/monolito/monolito-customer.js";
import microservicesAuthentication from "./scenarios/microservices/microservices-authentication.js";
import microservicesManager from "./scenarios/microservices/microservices-manager.js";
import microservicesCustomer from "./scenarios/microservices/microservices-customer.js";
import {group , sleep} from 'k6';


export default () => {
    group('Monolito', () => {
      //monolitoAuthentication();
      //monolitoManager()
      //monolitoCustomer()
    });
    group('Microservices', () => {
      //microservicesAuthentication()
      //microservicesManager()
      microservicesCustomer()
    });

    sleep(1);
}
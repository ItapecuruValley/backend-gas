const express = require("express");
const routes = new express.Router();

const Delete = require("./controllers/Delete");
const UserController = require("./controllers/UserController");
const AddressController = require("./controllers/AddressController");
const SolicitationController = require("./controllers/SolicitationController");
const DashboardController = require("./controllers/DashboardController");
const SessionController = require("./controllers/SessionController");
const UserDashboardController = require("./controllers/UserDashboardController");
const DeliveryMan = require("./controllers/DeliverymanController");
const Prices = require("./controllers/PriceGasController");
const Authorization = require("./middlewares/auth");
// Create
routes.post("/userDelete", Delete.All);
routes.post("/register", UserController.store);
routes.put("/updateUser", UserController.updateUser);

// Login User
routes.post("/login", SessionController.store);

// Dashboard ADM
routes.get("/", DashboardController.showUser); //Todos Usuarios
routes.get("/dashboard/users", DashboardController.showUser); //Todos Usuarios
routes.get("/dashboard/address", DashboardController.showAllAddress);// Todos Endereços
routes.get("/dashboard/solicitation", DashboardController.showAllSolicitation);// Todos Solicitaçoes
routes.get("/dashboard/userAddress", DashboardController.showEspecificAddress);// Todos Solicitaçoes
routes.get("/dashboard/userSolicitation", DashboardController.showEspecificSolicitaions);// Todos Solicitaçoes
routes.put("/dashboard/solicitationAndDeliveryman",SolicitationController.updateD);// Edita o Entregador
routes.put("/dashboard/solicitationAndStatus", SolicitationController.updateS);// Edita o Status da Entrega
routes.post("/dashboard/Prices", Prices.store); // Cria preço
routes.get("/dashboard/showPrices", Prices.showPrices); // Mostra o Preço
routes.put("/dashboard/PricesUpdate", Prices.updatePrice); // Atualiza o Preço

// DeliveryMan
routes.post("/dashboard/createDeliveryman", DeliveryMan.createDeliveryman); //Criar Entregador
routes.get("/dashboard/showDeliveryman", DeliveryMan.showDeliveryman); // Buscar Entregador
routes.get("/dashboard/showSolicitationsDMan",DeliveryMan.showSolicitationsDMan); // Monstrar Entregas do entegador
routes.get("/dashboard/showIdSolicitation",SolicitationController.showIdSolicitation); //Monstrar Solicitaçoes 
routes.get("/dashboard/showIdAddress",AddressController.showIdAddress); //Monstrar Solicitaçoes 

routes.put("/user/painel/updateAddress", AddressController.updateAddress); // Editar Endereços
// Authorization
routes.use(Authorization);

// Dashboard User
routes.get("/user/painel", UserDashboardController.userDashboard); //mostra usuário
routes.get("/user/address", UserDashboardController.addressDashboard); //mostrar endereços
routes.get("/user/solicitations", UserDashboardController.solicitationDashboard); //mostrar endereços

routes.post("/user/painel/address", AddressController.store); // Criar Endereços
routes.post("/user/painel/solicitation", SolicitationController.store);// Criar Solicitaçoes


module.exports = routes;

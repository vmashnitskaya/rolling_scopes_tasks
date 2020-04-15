export default class BaseController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindTrainChange(this.onTrainChange);
    this.model.bindMenuOpenChange(this.onMenuOpenChange);

    this.view.bindChangeTrain(this.handleChangeTrain);
    this.view.bindChangeMenuOpen(this.handleChangeMenuOpen);

    this.view.setMenuItems(this.model.menuItems);
    this.view.setCurrentMenuItem(this.model.currentMenuItem);
    this.view.setTrain(this.model.isTrain);
    this.view.setMenuOpen(this.model.isMenuOpen);
  }

  onTrainChange = () => {
    this.view.setTrain(this.model.isTrain);
  }

  handleChangeTrain = () => {
    this.model.isTrain = !this.model.isTrain;
  }

  onMenuOpenChange = () => {
    this.view.setMenuOpen(this.model.isMenuOpen);
  }

  handleChangeMenuOpen = () => {
    this.model.isMenuOpen = !this.model.isMenuOpen;
  }
}

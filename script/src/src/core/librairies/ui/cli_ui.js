"use strict";
class TcsUiManager {
    constructor() {
        this.modulesUi = {};
    }
    openUi(module, uiName) {
        if (!this.modulesUi[module.getId()]) {
            this.modulesUi[module.getId()] = [];
        }
        const moduleUi = this.modulesUi[module.getId()];
        if (moduleUi.indexOf(uiName) !== -1)
            return;
        SendNuiMessage(JSON.stringify({
            openInterface: true,
            module: module.getId(),
            file: uiName,
        }));
        moduleUi.push(uiName);
    }
    closeUi(module, uiName) {
        if (!this.modulesUi[module.getId()])
            return;
        const moduleUi = this.modulesUi[module.getId()];
        const index = moduleUi.indexOf(uiName);
        if (index === -1)
            return;
        SendNuiMessage(JSON.stringify({
            closeInterface: true,
            file: uiName,
        }));
        moduleUi.splice(index);
    }
    showModal(title, description) {
        SendNuiMessage(JSON.stringify({
            showModal: true,
            title: title,
            description: description,
        }));
    }
    showNotification(text, icon, color) {
        SendNuiMessage(JSON.stringify({
            showNotification: true,
            description: text,
            icon: icon,
            color: color,
        }));
    }
    showTitledNotification(title, description, icon, color) {
        SendNuiMessage(JSON.stringify({
            showTitledNotification: true,
            title: title,
            description: description,
            icon: icon,
            color: color,
        }));
    }
    showError(title, description) {
        SendNuiMessage(JSON.stringify({
            showError: true,
            title: title,
            description: description,
        }));
    }
    showWarning(title, description) {
        SendNuiMessage(JSON.stringify({
            showWarning: true,
            title: title,
            description: description,
        }));
    }
}
//# sourceMappingURL=cli_ui.js.map
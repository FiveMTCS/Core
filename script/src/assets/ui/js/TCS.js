const TCS = new TcsApi();

$(function () {
	window.addEventListener('message', function (event) {
		var data = event.data;

		if (data.openInterface) {
			const module = data.module;
			const file = data.file;

			TCS.loadInterface(module, file);
		}

		if (data.closeInterface) {
			const module = data.module;
			const file = data.file;

			TCS.deleteInterface(module, file);
		}

		if (data.showModal) {
			const title = data.title;
			const description = data.description;

			TCS.showModal(title, description);
		}

		if (data.showNotification) {
			const description = data.description;
			const icon = data.icon;
			const color = data.color;

			TCS.showNotification(description, icon, color);
		}

		if (data.showTitledNotification) {
			const title = data.title;
			const description = data.description;
			const icon = data.icon;
			const color = data.color;

			TCS.showTitledNotification(title, description, icon, color);
		}

		if (data.showError) {
			const title = data.title;
			const description = data.description;

			TCS.showErrorNotification(title, description);
		}

		if (data.showWarning) {
			const title = data.title;
			const description = data.description;

			TCS.showWarningNotification(title, description);
		}
	});
});

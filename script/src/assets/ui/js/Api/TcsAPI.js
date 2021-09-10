class TcsApi {
	constructor() {}

	loadInterface(module, filename) {
		$('#game').append(`
			<iframe
				name="${module}_${filename}" 
				src="${`nui://tcs/src/modules/${module}/ui/${filename}.html`}"
				frameborder="0"
				scrolling="auto"
				class="moduleInterface">
			</iframe>
		`);
	}

	deleteInterface(module, filename) {
		$(`#game iframe[name="${module}_${filename}"]`).remove();
	}

	showModal(title, description) {
		const render = mustache.render(modalTemplate, {
			title: title,
			description: description,
		});

		$('#game').append(render);
	}

	appendNotification(id, render) {
		let remainingTime = 3000;

		const interval = setInterval(function () {
			remainingTime -= 20;

			if (remainingTime <= 0) {
				clearInterval(interval);
				$(`#game #core-notifications #${id}`).remove();
			} else {
				const percent = Math.ceil((remainingTime / 3000) * 100);

				$(`#game #core-notifications #${id} .progress`).css(
					'width',
					`${percent}%`
				);
			}
		}, 20);

		$('#game #core-notifications').append(render);
	}

	showNotification(
		description,
		icon = 'notifications-circle-sharp',
		color = '#2980b9'
	) {
		const id = +new Date();
		const render = mustache.render(notificationTemplates.normal, {
			id: id,
			description: description,
			icon: icon,
			color: color,
		});

		this.appendNotification(id, render);
	}

	showTitledNotification(
		title,
		description,
		icon = 'notifications-circle-sharp',
		color = '#2980b9'
	) {
		const id = +new Date();
		const render = mustache.render(notificationTemplates.titled, {
			id: id,
			title: title,
			description: description,
			icon: icon,
			color: color,
		});

		this.appendNotification(id, render);
	}

	showErrorNotification(title, description) {
		this.showTitledNotification(title, description, 'bug-outline', '#e74c3c');
	}

	showWarningNotification(title, description) {
		this.showTitledNotification(
			title,
			description,
			'warning-outline',
			'#e67e22'
		);
	}
	removeModal() {
		$('#game .modal').remove();
	}

	sendData(event, data) {
		$.post('http://tcs/' + event, JSON.stringify(data));
	}
}

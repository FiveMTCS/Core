const notificationTemplates = {
	titled: `
		<div class="notification" id="{{id}}">
			<div class="top">
				<div class="left">
					<ion-icon name="{{icon}}" style="color: {{color}}"></ion-icon>
				</div>
				<div class="right">
					<h3 style="color: {{color}}">{{title}}</h3>
					<hr style="border-top: 1px solid {{color}};"/>
					<p>{{description}}</p>
				</div>
			</div>
			<div class="bottom">
				<div class="progress" style="background-color: {{color}}"></div>
			</div>
		</div>
	`,
	normal: `
		<div class="notification" id="{{id}}">
			<div class="top">
				<div class="left">
					<ion-icon name="{{icon}}" style="color: {{color}}"></ion-icon>
				</div>
				<div class="right">
					<p>{{description}}</p>
				</div>
			</div>
			<div class="bottom">
				<div class="progress" style="background-color: {{color}}"></div>
			</div>
		</div>
	`,
};

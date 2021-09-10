const modalTemplate = `
	<div class="modal">
			<div class="title">
				<h1>{{title}}</h1>
				<hr />
			</div>
			<div class="description">
				<p>
					{{description}}
				</p>
			</div>
			<div class="buttons">
				<button onclick='TCS.removeModal();'>Ok</button>
			</div>
	</div>
`;

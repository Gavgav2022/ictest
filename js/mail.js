// проверяем, что заполнены все поля. Если да - отправляем форму

$('form').submit(function (event) {
	// отменяем отправку формы по событию submit
	event.preventDefault();

	// записываем конкретно эту форму в переменную
	let form = $(this);

	// убираем возможные предыдущие сообщения об успехе/ошибках
	form.parent().find('.success').hide();
	form.parent().find('.error').hide();

	// сначала ошибок нет
	let error = 0;

	// ищем инпуты, которые должны быть заполнены, в форме и перебираем их
	form.find('input[name="name"], input[name="phone"], input[name="email"]').each(function () {
		// текущий инпут в цикле
		let input = $(this);
		input.removeClass('wrong-field');

		if (input.val() == '') {
			input.addClass('wrong-field');
			// нашли ошибку
			error = 1;
		}
	});

	// есть ошибка
	if (error == 1) {
		form.parent().find('.error').fadeIn();

		// нет ошибок
	} else {
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: './mail.php', // путь к обработчику
			data: form.serialize(),
			success: function (message) {
				if (message == 'ok') {
					form.trigger('reset'); // очищаем поля формы

					// здесь делаем что-то на свое усмотрение

					// form.find('.form-item').hide();
					// form.find('button').hide();
					form.parent().find('.success').fadeIn();

					setTimeout(function () {
						form.parent().find('.success').fadeOut();
						// setTimeout(function () {
						// 	form.find('.form-item').fadeIn();
						// 	form.find('button').fadeIn();
						// 	$('.contact-us-modal').fadeOut();
						// 	$('.contact-us-modal').addClass('hidden');
						// 	$('.modal-overlay').fadeOut();
						// 	$('.modal-overlay').addClass('hidden');
						// }, 500)
					}, 2000)

					// здесь делаем что-то на свое усмотрение

					// ошибка отправки формы
				} else if (message == 'err') {
					alert('Не отправилось сообщение!');
				}
			},
			// ошибка json
			error: function () {
				alert('Ошибка данных!');
			},
		});
	}
});
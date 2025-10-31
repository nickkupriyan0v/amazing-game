type ValidationRule = {
  regex: RegExp
  errorMessage: string
  name: string
}

type ValidationRules = {
  [key: string]: ValidationRule
}
export const validations: ValidationRules = {
  login: {
    name: 'login',
    regex: /^(?!-|\d)[A-Za-z0-9_-]{3,20}(?<!-)$/,
    errorMessage:
      'Логин должен быть от 3 до 20 символов. Допустимые символы: a-zA-Z, 0-9, -, _',
  },
  password: {
    name: 'пароль',
    regex: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage:
      'Пароль должен быть от 8 до 40 символов, содержать хотя бы одну заглавную букву и хотя бы одну цифру',
  },
  first_name: {
    name: 'имя',
    regex: /^[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё-]*$/,
    errorMessage:
      'Имя должно начинаться с заглавной буквы, содержать только буквы или дефис, и не должно содержать пробелы, цифры или специальные символы',
  },
  second_name: {
    name: '',
    regex: /^[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё-]*$/,
    errorMessage:
      'Фамилия должна начинаться с заглавной буквы, содержать только буквы или дефис, и не должна содержать пробелы, цифры или специальные символы',
  },

  email: {
    name: '',
    regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    errorMessage:
      'Введите корректный адрес электронной почты в формате example@domain.com',
  },
  phone: {
    name: '',
    regex: /^[\s()+-]*([0-9][\s()+-]*){6,20}$/,
    errorMessage: 'Номер телефона должен содержать от 10 до 15 цифр',
  },
}

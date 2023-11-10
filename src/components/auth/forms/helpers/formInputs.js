const formInputs = (refs, values) => {

    return [
        {
            name: 'name',
            type: 'text',
            value: values.name,
            placeholder: 'Username',
            label: 'Username',
            ref: refs.name,
            pattern: '(?=.*[a-z])[a-z0-9]{3,12}',
            requirements: [
                { text: 'Must begin with a letter', pattern: /^[a-z]+.*$/, fullfiled: false },
                { text: 'Lowercase letters & numbers', pattern: /^(?=.*[a-z])[a-z0-9]{2,}$/, fullfiled: false },
                { text: '5 to 12 characters', pattern: /^.{3,12}$/, fullfiled: false },
            ]
        },
        {
            name: 'email',
            type: 'email',
            value: values.email,
            placeholder: 'Email',
            label: 'Email',
            ref: refs.email,
            pattern: '[a-zA-Z0-9._%+\\-]{3,}@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}',
            requirements: [
                { text: 'Enter a valid email address', pattern: /^\w+([\.-]?\w+){3,}@\w+([\.-]?\w+)*(\.\w{2,})+$/, fullfiled: false }
            ]
        },
        {
            name: 'country',
            type: 'text',
            value: values.country,
            placeholder: 'Country',
            label: 'Country',
            ref: refs.country,
            pattern: '[a-zA-Z]{3,}',
            requirements: [
                { text: 'The country you currently live in', pattern: /^[a-zA-Z]{3,40}$/, fullfiled: false }
            ]
        },
        {
            name: 'password',
            type: 'password',
            value: values.password,
            placeholder: 'Password',
            label: 'Password',
            ref: refs.password,
            pattern: '^[a-zA-Z]+(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{7,16}$',
            requirements: [
                { text: 'Must begin with a letter', pattern: /^[a-zA-Z]+/, fullfiled: false },
                { text: 'One capital letter', pattern: /^(?=.*[a-zA-Z]).*[A-Z].*$/, fullfiled: false },
                { text: 'One number', pattern: /^[a-zA-Z].*(?=.*[0-9]).*$/, fullfiled: false },
                { text: 'One special character: [! @ # $ % ^ & *]', pattern: /^[a-zA-Z].*(?=.*[!@#$%^&*]).*$/, fullfiled: false },
                { text: '8 to 16 characters long', pattern: /^.{8,16}$/, fullfiled: false },
                { text: 'Valid characters', pattern: /^[a-zA-Z0-9!@#$%^&*]*$/, fullfiled: false },
            ]
        },
        {
            name: 'confirmPassword',
            type: 'password',
            value: values.confirmPassword,
            placeholder: 'Confirm Password',
            label: 'Confirm Password',
            ref: refs.confirmPassword,
            pattern: values.password,
            requirements: [
                {
                    text: 'Passwords must match',
                    pattern: values.password,
                    fullfiled: false
                }
            ]
        }
    ]
}

export default formInputs
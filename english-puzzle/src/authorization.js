const createUser = async (user) => {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    let content = '';
    if (rawResponse.status === 200) {
        content = await rawResponse.json();
    } else if (rawResponse.status === 422) {
        content = 'Incorrect e-mail or password';
    } else {
        throw new Error('');
    }
    return content;
};

const loginUser = async (user) => {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    console.log(user);
    let content = '';
    if (rawResponse.status === 200) {
        content = await rawResponse.json();
    } else {
        content = 'Incorrect e-mail or password';
    }
    return content;
};

export default {
    createUser,
    loginUser,
};

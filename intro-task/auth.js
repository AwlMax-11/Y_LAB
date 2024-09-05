document.getElementById('authForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const messageElement = document.getElementById('message');

    const mockFetch = async (url, options) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email === 'test@test.com' && password === 'password123') {
                    resolve({
                        ok: true,
                        json: async () => ({ message: 'Аутентификация успешна!' })
                    });
                } else {
                    resolve({
                        ok: false,
                        json: async () => ({ message: 'Ошибка аутентификации. Проверьте email и пароль.' })
                    });
                }
            }, 1000);
        });
    };

    try {
        const response = await mockFetch('https://example.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            messageElement.textContent = data.message;
            messageElement.style.color = 'blue';
        } else {
            const data = await response.json();
            messageElement.textContent = data.message;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        messageElement.textContent = 'Ошибка сети';
        messageElement.style.color = 'red';
    }
});

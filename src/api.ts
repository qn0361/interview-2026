export type User = { id: number; name: string; email: string };

const USERS: User[] = [
  { id: 1, name: 'Анна Иванова',     email: 'anna@example.com' },
  { id: 2, name: 'Иван Петров',      email: 'ivan@example.com' },
  { id: 3, name: 'Мария Сидорова',   email: 'maria@example.com' },
  { id: 4, name: 'Пётр Смирнов',     email: 'petr@example.com' },
  { id: 5, name: 'Ирина Кузнецова',  email: 'irina@example.com' },
  { id: 6, name: 'Антон Волков',     email: 'anton@example.com' },
];

/**
 * Имитация запроса к API. Отвечает с задержкой 300–1500 мс,
 * в ~10% случаев отклоняется с ошибкой сети.
 */
export function searchUsers(query: string): Promise<User[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) return reject(new Error('Network error'));
      const q = query.trim().toLowerCase();
      resolve(
        q === ''
          ? USERS
          : USERS.filter(
              (u) =>
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q),
            ),
      );
    }, 300 + Math.random() * 1200);
  });
}

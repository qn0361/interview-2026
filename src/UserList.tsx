// @ts-nocheck
import React, { useEffect, useState } from 'react';

type User = { id: number; name: string; email: string };

export default function UserList({ query }: { query: string }) {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users?q=${query}`)
      .then((r) => r.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const filtered = users.filter((u: User) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {loading && <span>Loading...</span>}
      {filtered.map((u: User, i: number) => (
        <div
          key={i}
          onClick={() => (window.location.href = `/users/${u.id}`)}
          style={{ cursor: 'pointer' }}
        >
          <img src={u.avatar} />
          {u.name}
        </div>
      ))}
    </div>
  );
}

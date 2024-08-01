import { Injectable } from '@nestjs/common';

type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
};

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'user1@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main Street',
      phone: '123-456-7890',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 2,
      email: 'user2@example.com',
      name: 'Alice Smith',
      password: 'abc@123',
      address: '456 Elm Street',
      phone: '456-789-0123',
      country: 'Canada',
      city: 'Toronto',
    },
    {
      id: 3,
      email: 'user3@example.com',
      name: 'Michael Johnson',
      password: 'securepass',
      address: '789 Oak Avenue',
      phone: '789-012-3456',
      country: 'UK',
      city: 'London',
    },
    {
      id: 4,
      email: 'user4@example.com',
      name: 'Emily Brown',
      password: 'passw0rd',
      address: '101 Pine Street',
      phone: '012-345-6789',
      country: 'Australia',
      city: 'Sydney',
    },
    {
      id: 5,
      email: 'user5@example.com',
      name: 'David Wilson',
      password: 'davidpass',
      address: '202 Cedar Avenue',
      phone: '234-567-8901',
    },
    {
      id: 6,
      email: 'user6@example.com',
      name: 'Sophia Johnson',
      password: 'sophia123',
      address: '303 Maple Street',
      phone: '345-678-9012',
      country: 'USA',
      city: 'Los Angeles',
    },
    {
      id: 7,
      email: 'user7@example.com',
      name: 'Daniel Martinez',
      password: 'danielpass',
      address: '404 Oak Street',
      phone: '456-789-0123',
      country: 'Mexico',
      city: 'Mexico City',
    },
    {
      id: 8,
      email: 'user8@example.com',
      name: 'Olivia Taylor',
      password: 'oliviapass',
      address: '505 Elm Avenue',
      phone: '567-890-1234',
      country: 'Canada',
      city: 'Vancouver',
    },
    {
      id: 9,
      email: 'user9@example.com',
      name: 'James Wilson',
      password: 'jamespass',
      address: '606 Cedar Street',
      phone: '678-901-2345',
      country: 'UK',
      city: 'Manchester',
    },
    {
      id: 10,
      email: 'user10@example.com',
      name: 'Emma Garcia',
      password: 'emmapass',
      address: '707 Pine Avenue',
      phone: '789-012-3456',
      country: 'Australia',
      city: 'Melbourne',
    },
  ];

  // [1,2,3,4,5,6,7,8,9,0] ---> [1,2,3,4] [5,6,7,8] [9,0]

  getUsers(page: number, limit: number) {
    const start = (page - 1) * limit; // NaN
    const end = start + +limit;

    const users = this.users.slice(start, end);

    return users.map(({ password, ...user }) => user);
  }

  getUser(id: string) {
    const user = this.users.find((user) => user.id === +id);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  addUser(user: User) {
    const id = this.users.length + 1;
    user.id = id;

    this.users.push(user);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  updateUser(id: string, user: User) {
    const oldUser = this.users.find((user) => user.id === +id);

    if (!oldUser) {
      return 'Ese usuario no existe';
    }

    const updatedUser = { ...oldUser, ...user };

    const index = this.users.findIndex((user) => user.id === +id);
    this.users[index] = updatedUser;

    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  deleteUser(id: string) {
    const index = this.users.findIndex((user) => user.id === +id);
    const user = this.users[index];

    this.users.splice(index, 1);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}

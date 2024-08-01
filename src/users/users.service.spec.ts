import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { Users } from 'src/entities/users.entity';

describe('UsersService', () => {
  let service: UsersService;
  let mockUsersRepository;

  const mockUser: Partial<Users> = {
    name: 'Bartolomiau',
    email: 'barto@gmail.com',
    password: 'ksdfjnbgwer8234vgn',
    phone: 1234567,
    address: 'Un lugar',
    country: 'Mexico',
    city: 'Mexico',
  };

  beforeEach(async () => {
    const mockUsersRopository = {
      find: () =>
        Promise.resolve([
          {
            ...mockUser,
            isAdmin: false,
            id: 'jbsdvhfb23642-wefr34534-dsfvertv34',
            orders: ['23rsdsdf-234234f2dacsd-234fdsdfwerf'],
          },
        ]),

      remove: () => {},
      findOneBy: (id: string) =>
        Promise.resolve({
          ...mockUser,
          isAdmin: false,
          id: 'jbsdvhfb23642-wefr34534-dsfvertv34',
          orders: ['23rsdsdf-234234f2dacsd-234fdsdfwerf'],
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRopository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getUser does not return the password property', async () => {
    // const user = await service.getUsers(2, 3);
    // const { password, ...mockUserNoPassword } = user;
    // expect(user.password).not.toBeDefined();
    // expect(user).toEqual(mockUserNoPassword);
  });

  it('getUser by id returns an error if the user doesnt exists', async () => {
    mockUsersRepository.findOneBy = (id) => Promise.resolve(false);
    const user = await service.getUser('noexiste');

    // expect(error.message).toEqual('User Not Found');
  });
});

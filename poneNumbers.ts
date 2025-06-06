const users: User[] = [
  {
    index: 0,
    isActive: true,
    balance: "$2,226.60",
    name: "Eugenia Sawyer",
    gender: "female",
    phone: "+1 (840) 583-3207",
    address: "949 John Street, Rose, Puerto Rico, 1857",
  },
  {
    index: 1,
    isActive: true,
    balance: "$2,613.77",
    name: "Pauline Gallegos",
    gender: "female",
    phone: "+1 (985) 593-3328",
    address: "328 Greenpoint Avenue, Torboy, North Dakota, 6857",
  },
  {
    index: 2,
    isActive: false,
    balance: "$3,976.41",
    name: "Middleton Chaney",
    gender: "male",
    phone: "+1 (995) 591-2478",
    address: "807 Fleet Walk, Brutus, Arkansas, 9783",
  },
  {
    index: 3,
    isActive: true,
    balance: "$4,233.78",
    name: "Suzette Lewis",
    gender: "male",
    phone: "+1 (995) 587-3985",
    address: "920 Seba Avenue, Osage, Alabama, 6290",
  },
  {
    index: 4,
    isActive: true,
    balance: "$3,261.65",
    name: "Mcfadden Horne",
    gender: "male",
    phone: "+1 (942) 565-3988",
    address: "120 Scholes Street, Kirk, Michigan, 1018",
  },
  {
    index: 5,
    isActive: false,
    balance: "$1,790.56",
    name: "Suzette Lewis",
    gender: "female",
    phone: "+1 (837) 586-3283",
    address: "314 Dunne Place, Bawcomville, Guam, 9053",
  },
  {
    index: 6,
    isActive: false,
    balance: "$690.56",
    name: "Pauline Gallegos",
    gender: "female",
    phone: "+1 (837) 235-8462",
    address: "212 Seba Avenue, Osage, Alabama, 3234",
  },
  {
    index: 7,
    isActive: true,
    balance: "$1,934.58",
    name: "Burns Poole",
    gender: "male",
    phone: "+1 (885) 559-3422",
    address: "730 Seba Avenue, Osage, Alabama, 6290",
  },
];

type User = {
  index: number;
  isActive: boolean;
  balance: string;
  name: string;
  gender: string;
  phone: string;
  address: string;
};

function getBalanceAsNumber(client: User): number {
  return parseFloat(client.balance.replace(/[^0-9.]/g, ""));
}

const lowBalance = (clients: User[]): string[] => {
  const arr: string[] = [];
  clients.forEach((user) => {
    if (getBalanceAsNumber(user) < 2000) {
      arr.push(user.phone);
    }
  });
  return arr;
};

const sumOfBalance = (clients: User[]): string => {
  return clients
    .reduce((acc, client) => {
      acc = acc + getBalanceAsNumber(client);
      return acc;
    }, 0)
    .toFixed(2);
};

const maxBalance = (clients: User[]): User | undefined => {
  return clients.reduce((maxUser, currentUser) => {
    return getBalanceAsNumber(currentUser) > getBalanceAsNumber(maxUser)
      ? currentUser
      : maxUser;
  }, clients[0]);
};

const repeatName = (clients: User[]): User[] => {
  const duplicateFilter = (client: User, _: number, array: User[]): boolean => {
    const sameNameClients = array.filter((value) => value.name === client.name);
    return sameNameClients.length > 1;
  };
  const duplicateNameClients = clients.filter(duplicateFilter);
  return duplicateNameClients.sort((next, prev) =>
    next.name < prev.name ? -1 : 1
  );
};

console.log(lowBalance(users));
console.log(sumOfBalance(users));
console.log(maxBalance(users));
console.log(repeatName(users));
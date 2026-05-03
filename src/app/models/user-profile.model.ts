export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  membership: string;
  phone?: string;
  pet?: Pet;
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  weight: string;
  age: string;
  nextVaccine: string;
  image: string;
}

'use client';

import { createContext, useContext, useState } from 'react';
// import { User } from '../types';

// type UserContext = {
// 	user: User | null;
// 	setUser: React.Dispatch<React.SetStateAction<User>>;
// };

export const UserContext = createContext({
	user: null,
	login: () => { },
	logout: () => { },
	authReady: false
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState(null);

	return (
		<UserContext.Provider value={{ user }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserContextProvider');
	}
	return context;
}
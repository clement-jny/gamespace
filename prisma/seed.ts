import { db } from '../lib/prisma';
import { hash } from 'bcryptjs';

(async () => {
	// await db.image.deleteMany({});
	// await db.product.deleteMany({});
	// await db.address.deleteMany({});
	await db.user.deleteMany({});

	await db.user.create({
		data: {
			username: 'victor',
			email: 'victor@gs.com',
			password: await hash('victor', 12),
			address: {
				create: {
					street: '1 rue de la paix',
					city: 'Paris',
					zipCode: '75000',
				},
			},
			products: {
				create: [
					{
						title: 'product-1',
						price: 10,
						description: 'description-1',
						productCondition: 'GOOD',
						platform: 'PLAYSTATION',
						images: {
							create: [
								{
									url: '/images/rocket_game.jpg'
								}
							]
						}
					},
					{
						title: 'product-2',
						price: 20,
						description: 'description-2',
						productCondition: 'POOR',
						platform: 'NINTENDO',
						images: {
							create: [
								{
									url: '/images/spiderman2.jpg'
								}
							]
						}
					}
				]
			}
		}
	});

	await db.user.create({
		data: {
			username: 'julien',
			email: 'julien@gs.com',
			password: await hash('julien', 12),
			address: {
				create: {
					street: '5 allée des mimosas',
					city: 'Strasbourg',
					zipCode: '67000',
				},
			},
			products: {
				create: [
					{
						title: 'product-1',
						price: 10,
						description: 'description-1',
						productCondition: 'GOOD',
						platform: 'PLAYSTATION',
						images: {
							create: [
								{
									url: '/images/faefarm.jpg'
								}
							]
						}
					},
					{
						title: 'product-2',
						price: 20,
						description: 'description-2',
						productCondition: 'POOR',
						platform: 'NINTENDO',
						images: {
							create: [
								{
									url: '/images/fc24.jpg'
								}
							]
						}
					}
				]
			}
		}
	});

	await db.user.create({
		data: {
			username: 'clement',
			email: 'clement@gs.com',
			password: await hash('clement', 12),
			address: {
				create: {
					street: '10 place de la république',
					city: 'Armentières',
					zipCode: '59280',
				},
			},
			products: {
				create: [
					{
						title: 'product-1',
						price: 10,
						description: 'description-1',
						productCondition: 'GOOD',
						platform: 'PLAYSTATION',
						images: {
							create: [
								{
									url: '/images/gow_ragnarok.jpeg'
								}
							]
						}
					},
					{
						title: 'product-2',
						price: 20,
						description: 'description-2',
						productCondition: 'POOR',
						platform: 'NINTENDO',
						images: {
							create: [
								{
									url: '/images/mario_luigi_voyage_centre_bowser.jpg'
								}
							]
						}
					}
				]
			}
		}
	});
})()
	.then(async () => {
		await db.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await db.$disconnect()
		process.exit(1)
	})
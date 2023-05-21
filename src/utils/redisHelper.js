import redisConfig from '../config/redis.js';
import { createAdapter } from '@socket.io/redis-adapter';
import { Cluster } from 'ioredis';

export function adapter(sockerIOServer) {
	let pubClient = new Cluster(redisConfig.clusters, {
		redisOptions: {
			password: redisConfig.password,
			showFriendlyErrorStack: redisConfig.showFriendlyErrorStack,
		},
	});

	let subClient = pubClient.duplicate();

	sockerIOServer.adapter(createAdapter(pubClient, subClient));
}

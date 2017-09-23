const Command = require('../../structures/Command');
const snekfetch = require('snekfetch');
const { xml2json } = require('xml-js');
const { stripIndents } = require('common-tags');

module.exports = class SafebooruCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'safebooru',
			group: 'search',
			memberName: 'safebooru',
			description: 'Searches Safebooru for your query.',
			args: [
				{
					key: 'query',
					prompt: 'What image would you like to search for?',
					type: 'string',
					default: ''
				}
			]
		});
	}

	async run(msg, { query }) {
		try {
			const { text } = await snekfetch
				.get('https://safebooru.org/index.php')
				.query({
					page: 'dapi',
					s: 'post',
					q: 'index',
					tags: query
				});
			const parsed = xml2json(text, { compact: true });
			if (parsed.posts.count === '0' || !parsed.posts.post.length) return msg.say('Could not find any results.');
			const posts = msg.channel.nsfw ? parsed.posts.post : parsed.posts.post.filter(post => post.rating === 's');
			return msg.say(stripIndents`
				${query ? `Results for ${query}:` : 'Random Image:'}
				https:${posts[Math.floor(Math.random() * posts.length)].file_url}
			`);
		} catch (err) {
			return msg.say(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};

const Command = require('../../structures/Command');
const { randomFromImgurAlbum } = require('../../util/Util');

module.exports = class KissCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kiss',
			group: 'roleplay',
			memberName: 'kiss',
			description: 'Kisses a user.',
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to roleplay with?',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { user }) {
		try {
			const gif = await randomFromImgurAlbum('twIbD');
			return msg.say(`_**${msg.author.username}** kisses **${user.username}**._`, { files: [gif] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};

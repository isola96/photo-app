/**
 * Album model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'album',
		photos() {
			return this.hasMany('Photo')
		},
		users() {
			return this.belongsTo('User')
		}
	});
};
/**
 * User model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'user',
		photos() {
			return this.hasMany('Photo')
		},
		albums() {
			return this.hasMany('Album')
		}
	});
};

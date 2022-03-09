/**
 * User model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('user_model', {
		tableName: 'users',
		photos() {
			return this.hasMany('photo_model')
		},
		albums() {
			return this.hasMany('album_model')
		}
	});
};

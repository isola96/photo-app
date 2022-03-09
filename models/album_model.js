/**
 * Album model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('album_model', {
		tableName: 'album',
		photos() {
			return this.belongsToMany('photo_model')
		},
		users() {
			return this.belongsTo('user_model')
		}
	});
};
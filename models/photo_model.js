/**
 * Photo model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('photo_model', {
		tableName: 'photo',
		albums() {
			return this.belongsToMany('album_model');
		},
		users() {
			return this.belongsTo('user_model');
		}
	});
};
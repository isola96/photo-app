/**
 * AlbumPhoto model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('album_photo', {
		tableName: 'album_photo',
		albums() {
			return this.hasMany('album_model');
		},
        photos() {
            return this.hasMany('photo_model');
        }
	});
};
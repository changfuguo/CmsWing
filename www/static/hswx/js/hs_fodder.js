var _HS_UM = UM.getEditor("myEditor");
// 初始化Web Uploader
var uploader = WebUploader.create({
    // 选完文件后，是否自动上传。
    auto: true,
    // swf文件路径
//			    swf: '/js/Uploader.swf',
    // 文件接收服务端。
    server: '',
    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '#hsfilePicker',
    // 只允许选择图片文件。
    accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
    },
    name: 'tmp_name'
});

// 当有文件添加进来的时候
uploader.on('fileQueued', function( file ) {
	console.log(file);
    // $list为容器jQuery实例
	
    // 创建缩略图
    // 如果为非图片文件，可以不用调用此方法。
    // thumbnailWidth x thumbnailHeight 为 100 x 100
    uploader.makeThumb( file, function( error, src ) {
        if ( error ) {
            console.error('图片上传错误');
            return;
        }
        
    }, 100, 'auto');
});
;$(function(){
	/**
	 * 添加一个item
	 */
	$(document).on('click', '.hs-fodder-add', function(){
		_hs_fodder_item();
	});
	
	/**
	 * 单击 hs-fodder-item 事件
	 */
	$(document).on('click', '.hs-fodder-item', function(){
		$('.hs-fodder-item').removeClass('active');
		$(this).addClass('active');
	});
	
	/**
	 * 删除 hs-fodder-item //.hs-igdl
	 */
	$(document).on('click', '.hs-igdl', function(){
		var item = $(this).closest('.hs-fodder-item');
		item.remove();
	});
	
	
	/**
	 * 监听标题的改变事件
	 */
	$(document).on('keyup', '.hs-um-title', function(){
		_hs_update_item_title(this.value);
	});
	
	/**
	 * 监听原文链接功能
	 */
	$(document).on('click', '.hs-source-url-checkbox', function(){
		if($(this).is(":checked")){
			$('.hs-source-url-input').show();
		}else{
			$('.hs-source-url-input').hide();
		}
	});
	
	/**
	 * 监听页面滚动事件
	 */

	/**
	 * 定位于顶部
	 */
	var _hs_current_box = $('#hs-current-box');
	var current_t = _hs_current_box.offset();
	$(window).scroll(function(e){ 
		var doc_t = $(document).scrollTop();
		if(doc_t >= current_t.top){
			_hs_current_box.css({'position':'fixed', 'top':'0'});
		}else{
			_hs_current_box.css({'position':'', 'top':''});
		}
	});
});
var _hs_wx_fodder = {
  	"articles": [
    //若新增的是多图文素材，则此处应还有几段articles结构
 	]
}
/*{
   "title": TITLE,
   "thumb_media_id": THUMB_MEDIA_ID,
   "author": AUTHOR,
   "digest": DIGEST,
   "show_cover_pic": SHOW_COVER_PIC(0 / 1),
   "content": CONTENT,
   "content_source_url": CONTENT_SOURCE_URL
},*/

/**
 * 布局编辑器数据
 * @param {Object} obj
 */
function _hs_wx_edit_fodder(obj){
	var _title = $(".hs-um-title");
	var _author = $('.hs-um-author');
//	var _umbody 通过百度编辑器设定
	var _source_url = $('.hs-source-url-input');
	var _source_url_c = $('.hs-source-url-checkbox');
	
	var _pic = $("#hsfileList");
	var _digest = $("#digest");
	if(obj){
		_HS_UM.setContent(obj.content);
		_title.val(obj.title).focus();
		_author.val(obj.author);
		if(obj.content_source_url){
			_source_url.val(obj.content_source_url);
			_source_url_c.pop("checked", true);
		}
		_pic.html('');//图片
		_digest.val(obj.digest);
	}else{
		console.log(false)
		_HS_UM.execCommand('cleardoc');
		_title.val('').focus()
		_author.val('')
		_source_url.val('')
		_source_url_c.removeAttr('checked');
		_pic.html('');
		_digest.val('');
	}
}

/**
 * 获取编辑器数据
 */
function _hs_wx_get_editor(){
	var _title = $(".hs-um-title");
	var _author = $('.hs-um-author');
//	var _umbody 通过百度编辑器设定
	var _source_url = $('.hs-source-url-input');
	var _source_url_c = $('.hs-source-url-checkbox');
	
	var _pic = $("#hsfileList");
	var _digest = $("#digest");
	
	var TITLE = _title.val(),
		THUMB_MEDIA_ID = 0,
		AUTHOR = _author.val(),
		DIGEST = _digest.val(),
		SHOW_COVER_PIC = 1; //封面
		CONTENT = '',
		CONTENT_SOURCE_URL = _source_url_c.is(":checked") ? _source_url.val() : '';
	var _tmp = {
		   "title": TITLE,
		   "thumb_media_id": THUMB_MEDIA_ID,
		   "author": AUTHOR,
		   "digest": DIGEST,
		   "show_cover_pic": SHOW_COVER_PIC,
		   "content": CONTENT,
		   "content_source_url": CONTENT_SOURCE_URL
		}	
	return _tmp;
}

/**
 * 获取当前选中的item
 */
function _hs_current_item(){
	return $('.hs-fodder-item.active');
}

/**
 * 更新当前item的标题
 * @param {String} value
 */
function _hs_update_item_title(value){
	var _item = null;
	if(arguments[1]){
		_item = arguments[1];
	}else{
		_item = _hs_current_item();
	}
	if(_item){
		_item.find('.hs-item-title-h4').html(value);
		_item.find('.hs-item-title-h4-2').html(value);
	}else{
		console.error('图文项,更新标题发生错误.');
	}
}
/**
 * 更新item的图片
 * @param {String} src
 */
function _hs_update_item_image(src){
	var _item = null;
	if(arguments[1]){
		_item = arguments[1];
	}else{
		_item = _hs_current_item();
	}
	if(_item){
		if(!src){
			_item.find('.hs-item-cover').attr('style', '');
			$('#hsfileList').html('');
		}else{
			_item.find('.hs-item-cover').css({'background-image': 'url('+src+')'});
			var $list = $('#hsfileList');
			var $img = '<img src="'+src+'" />';
        	$list.html($img);
		}
	}else{
		console.error('图文项,更新图片发生错误.');
	}
}

/**
 * 新建图文项
 */
function _hs_fodder_item(){
	var _dom = ['<div class="hs-fodder-item active">',
	'	<div class="hs-fodder-item-first">',
	'		<div class="hs-fodder-item-container">',
	'			<i class="hs-default-wxpic"></i>',
	'			<div class="hs-item-title-h4">标题</div>',
	'		</div>',
	'		<div class="hs-fodder-item-mask">',
	'			<a class="hs-igup" href="javascript:;" alt="上移">向上</a>',
	'			<a class="hs-igdp" href="javascript:;" alt="下移">向下</a>',
	'			<a class="hs-igdl" href="javascript:;" alt="删除">删除</a>',
	'		</div>',
	'	</div>',
	'	<div class="hs-fodder-item-second">',
	'		<div class="hs-fodder-item-container">',
	'			<div class="hs-fodder-item-rpic">',
	'				<i class="hs-default-wxpic-2"></i>',
	'			</div>',
	'			<div class="hs-item-title-h4-2">标题</div>',
	'		</div>',
	'		<div class="hs-fodder-item-mask">',
	'			<a class="hs-igup" href="javascript:;" alt="上移">向上</a>',
	'			<a class="hs-igdp" href="javascript:;" alt="下移">向下</a>',
	'			<a class="hs-igdl" href="javascript:;" alt="删除">删除</a>',
	'		</div>',
	'	</div>',
	'</div>'].join("");
	$('.hs-fodder-item').removeClass('active');
	_hs_wx_edit_fodder(null);//重置编辑器数据
	$('.hs-fodder-items').append(_dom);
}
function handleButtonClick() {

    console.log('4533');
    $(".all-tasks").append("<div>werwerwer</div>");

}

var cachedContent = function () {
    'use strict';
    
    var cachedContent = '';
    var that = this;
    
    this.saveContent = function (content) {
        console.log(that.cachedContent);
        console.log(content);
        that.cachedContent = content;
    }
    
    this.getContent = function () {
        console.log(that.cachedContent);
        return that.cachedContent;
    }
    
};





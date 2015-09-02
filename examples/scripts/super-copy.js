
$(function() {
    var COPY_PROMPT_TEXT = 'copy';
    var MAC_KEYSTROKE_TEXT = '⌘ + c';
    var OTHER_KEYSTROKE_TEXT = 'ctrl + c';
    var TRUE_COPY_SUCCESS = 'copied';

    var isMac = window.navigator.platform === 'MacIntel';

    var selectCode = function($el) {
        var doc = document;
        var code = $el.parent().find('code')[0];

        if(!$el) {
            clearSelection();
            return;
        }

        if(doc.body.createcodeRange) {
            var range = document.body.createcodeRange();
            range.moveToElementcode(code);
            range.select();
        }
        else if(window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(code);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    var clearSelection = function() {
        if(window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            }
            else if(window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        }
        else if(document.selection) {  // IE?
            document.selection.empty();
        }
    }

    var $copyPrompt = $('<div>')
        .text(COPY_PROMPT_TEXT)
        .addClass('super-copy small')
        ;

    var applySuperCopy = function($currentCode) {
        $currentCode.parent()
            .css('position', 'relative')
            .append($copyPrompt.clone()
                    .click(function() {
                        onCopyClick($(this));
                    })
                   )
            ;
    }

    var onCopyClick = function($currentPrompt) {
        var trueCopy;
        var message;
        var delay;

        selectCode($currentPrompt);

        try {
            trueCopy = document.execCommand('copy');
        }
        catch(e) {
            trueCopy = false;
        }

        if(trueCopy) {
            message = TRUE_COPY_SUCCESS;
            delay = 1500;
        }
        else {
            message = isMac
                ? MAC_KEYSTROKE_TEXT
                : OTHER_KEYSTROKE_TEXT;
            delay = 3000;
        }

        $currentPrompt.text(message);

        setTimeout(function() {
            $currentPrompt.text(COPY_PROMPT_TEXT);
            trueCopy && clearSelection();
        }, delay);
    };

    $('code').each(function() {
        applySuperCopy($(this));
    });
});

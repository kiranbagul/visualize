$(function () {
    var ExpressionInputView = function(){
        this.exp = [];
    };
    
     ExpressionInputView.prototype.getExpressionInfo = function(){
        return this.exp;
     };
    
    ExpressionInputView.prototype.addInput = function(vars){
        var div = $('<div>').attr('id', this.exp.length+'_container').addClass('expContainer');
        var expInputDiv = $('<div>');
        var textBox= $('<input>').attr('id', this.exp.length+'_exp').addClass('inputbox expInput');
        expInputDiv.append(this.getInputLabel('Expression'));
        expInputDiv.append(textBox);
        var variableProps = $('<div>').addClass('variableProps');
        for(var count = 0; count < vars; count++){
            var textBoxDivName = $('<span>').text('Expression').addClass('infoTextLabel');
            var minBox = $('<input>').attr('id', this.exp.length+"_"+count+"_min").addClass('inputbox inputVariable');
            var maxBox = $('<input>').attr('id', this.exp.length+"_"+count+"_max").addClass('inputbox inputVariable');
            var stepvalue = $('<input>').attr('id', this.exp.length+"_"+count+"_step").addClass('inputbox inputVariable');
            variableProps.append(this.getInputLabel('Minimum value of '+varConstants['_'+count])).append(minBox);
            variableProps.append(this.getInputLabel('Maximum value of '+varConstants['_'+count])).append(maxBox);
            variableProps.append(this.getInputLabel('Step value to increment '+varConstants['_'+count])).append(stepvalue);
            variableProps.append('<br>');
        }
        this.exp.push({varCount : vars});
        div.append(expInputDiv);
        div.append(variableProps);
        return div;
    };
    
    ExpressionInputView.prototype.getInputLabel = function(text){
        return $('<span>').text(text).addClass('infoTextLabel');
    };

    
    window.ExpressionInputView = ExpressionInputView;

});
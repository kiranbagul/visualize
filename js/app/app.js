$(function () {
    
    var varConstants = {
        '_0' : 'a',
        '_1' : 'b',
        '_2' : 'c',
        '_3' : 'd',
        '_4' : 'e',
        '_5' : 'f',
        '_6' : 'g',
        '_7' : 'h',
        '_8' : 'i',
        '_9' : 'h'
    };
    
    window.varConstants = varConstants;
    
    
    var variable = function(min, max, step){
        this.min = min;
        this.max = max;  
        this.step = step;
    };
        
    var Expression = function(exp){
        this.exp = exp;
        this.variables = [];
        this.data = [];
        this.addVariable = function(variable){
            this.variables.push(variable);
        };
    };
        
    var App = function () {
        this.expressions = [];
        this.seriesList = [];
    };

    App.prototype.reset = function () {
        this.expressions = [];
        this.seriesList = [];
    };
    
    App.prototype.addExp = function (expression) {
        this.expressions.push(expression);
        var formula = math.compile(expression.exp);
        var data = [];
        var stepData = {};
        var vars = expression.variables;
        var heighestCount = 0;
        for(var count=0; count < vars.length; count++){
            stepData['_'+count] = [];
            for(var exCount=vars[count].min; exCount < vars[count].max; exCount=exCount+vars[count].step){
                heighestCount = heighestCount < exCount ? exCount : heighestCount;
                stepData['_'+count].push(exCount);
            }
        }
        console.log(stepData);
        var cleanedStepData = {};
        for(var varCount=0; varCount < vars.length; varCount++){
            cleanedStepData['_'+varCount] = [];
            for(var dataCount=0; dataCount < heighestCount; dataCount++){
                var val = !isNaN(stepData['_'+varCount][dataCount]) ? stepData['_'+varCount][dataCount] : cleanedStepData['_'+varCount][dataCount - 1];
                console.log(val +" "+varCount+" "+dataCount+" -- "+stepData['_'+varCount][dataCount] );
                cleanedStepData['_'+varCount].push(val);
            }
        }
        console.log(cleanedStepData);
        for(var stepCount=0; stepCount < heighestCount; stepCount++){
            var scope = {};
            for(count=0; count < vars.length; count++){
                var val = cleanedStepData['_'+count][stepCount];
                scope[varConstants['_'+count]] = val;
            }
            console.log(scope);
            var an = formula.eval(scope);
            data.push(an);
        }
            
        console.log(this.seriesList);
        this.seriesList.push({
            name: expression.exp,
            data: data
        });
    };

    App.prototype.plot = function(id){
        var exp = this.expressions;
        var data = this.seriesList;
        $('#'+id).highcharts({
            credits: false,
            chart: {
                type: 'area'
            },
            title: {
                text: 'Expression data series'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Base'
                },
                labels: {
                    formatter: function () {
                        return this.value ;
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/> {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 0,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: data
        });
    };
    
    var app = new App();
    var expView = new ExpressionInputView();
    $('#addExp').click(function(){
        $('#expressions').append(expView.addInput(2));
    });
    $('#plot').click(function(){
        app.reset();
        var exps = expView.getExpressionInfo();
        for(var i = 0; i < exps.length; i++){
            var exp = new Expression($('#'+i+'_exp').val());
            for(var j = 0; j < exps[i].varCount; j++){
                var scope = {
                    min : parseInt($('#'+i+'_'+j+'_min').val()), 
                    max: parseInt($('#'+i+'_'+j+'_max').val()), 
                    step : parseInt($('#'+i+'_'+j+'_step').val())
                };
                console.log(j);
                exp.addVariable(scope);
            }
            app.addExp(exp);
        }
        app.plot('chart');
    });
    
    var exp = new Expression('a ^2 + b ^ 2');
    exp.addVariable({min : 0, max: 20, step : 1});
    exp.addVariable({min : 0, max: 40, step : 2});
    var exp2 = new Expression('(a^3)+b^2');
    exp2.addVariable({min : 0, max: 20, step : 1});
    exp2.addVariable({min : 0, max: 40, step : 2});

    app.addExp(exp);
    app.addExp(exp2);
    app.plot('chart');
//    app.addExp(exp3);
    
});

<!DOCTYPE html>
<html>
    <head>
        <title>Hello World</title>
        <script src="<?php echo asset('react/examples/shared/thirdparty/es5-shim.min.js'); ?>"></script>
        <script src="<?php echo asset('react/examples/shared/thirdparty/es5-sham.min.js') ?>"></script>
        <script src="<?php echo asset('react/examples/shared/thirdparty/console-polyfill.js'); ?>"></script>
        <script src="<?php echo asset('react/build/react.js'); ?>"></script>
        <script src="<?php echo asset('react/build/JSXTransformer.js'); ?>"></script>
    </head>
    <body>
        <div id="container"></div>
        <script type="text/jsx">
            var ExampleApplication = React.createClass({
                render: function() {
                    var elapsed = Math.round(this.props.elapsed  / 100);
                    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
                    var message =
                            'React has been successfully running for ' + seconds + ' seconds.';

                    return <p>{message}</p>;
                }
            });
            var start = new Date().getTime();
            setInterval(function() {
                React.render(
                        <ExampleApplication elapsed={new Date().getTime() - start} />,
                        document.getElementById('container')
                );
            }, 50);
        </script>
    </body>
</html>
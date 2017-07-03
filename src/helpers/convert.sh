xvfb-run --server-args='-screen 0, 1024x768x24' wkhtmltopdf --margin-top 1.5cm --margin-bottom 1.5cm --margin-left 0 --margin-right 0 $*

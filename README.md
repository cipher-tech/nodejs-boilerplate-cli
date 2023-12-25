A CLI tool to generate a very fast production ready NodeJs application in no time.

## Commands

| Commands            |                        Description                         |                Example |
| ------------------- | :--------------------------------------------------------: | ---------------------: |
| create              |                   Creates a new project                    | ome create new-project |
| -m or --model       |         Create a new model in the model directory          |            ome -m post |
| -c or --controller  |    Create a new controller file in specified directory     |            ome -c post |
| -s or --service     |      Create a new service file in specified directory      |            ome -s post |
| -r or --route       |       Create a new route file in specified directory       |            ome -r post |
| -R or --resource    |     Create a new resource file in specified directory      |            ome -R post |
| -u or --utility     |  Create a new utility helper file in specified directory   |            ome -u post |
| -M or --middleware  | Create a new middleware helper file in specified directory |            ome -M post |
| -v or --validator   |   Create a new validator file in the validator directory   |            ome -v post |
| -U or --unittest    |   Create a new unittest file in the unit test directory    |            ome -U post |
| -I or --integration |    Create a new integration file in the test directory     |            ome -I post |

-   automatically adds 'Controller' suffix
-   no need to name controllers as plural e.g posts(instead use post)
-   can specify/create new folder from argument (post/postService)

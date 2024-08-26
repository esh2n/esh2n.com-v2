port module Terminal exposing (main)

import Array exposing (Array)
import Browser
import Browser.Dom as Dom
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onBlur, onFocus, onInput, onSubmit)
import Task



-- PORTS


port scrollToBottom : () -> Cmd msg


port focusInput : (String -> msg) -> Sub msg



-- MODEL


type alias Model =
    { input : String
    , history : Array String
    , currentDir : String
    , output : List (List (Html Msg))
    , isFocused : Bool
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { input = ""
      , history = Array.empty
      , currentDir = "C:\\Users\\esh2n"
      , output = []
      , isFocused = False
      }
    , Cmd.none
    )



-- UPDATE


type Msg
    = Input String
    | Submit
    | NoOp
    | FocusInput String
    | FocusResult (Result Dom.Error ())
    | ClearOutput
    | Focused Bool


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Input value ->
            ( { model | input = value }, Cmd.none )

        Submit ->
            let
                newOutput =
                    model.output ++ [ [ span [ class "prompt" ] [ text (model.currentDir ++ "> ") ], text model.input ] ]

                newHistory =
                    Array.push model.input model.history

                cmd =
                    String.toLower (String.trim model.input)
            in
            case cmd of
                "clear" ->
                    ( { model | input = "", output = [] }, scrollToBottom () )

                _ ->
                    let
                        cmdOutput =
                            processCommand cmd
                    in
                    ( { model | input = "", output = newOutput ++ cmdOutput, history = newHistory }
                    , Cmd.batch [ scrollToBottom (), Task.perform (\_ -> NoOp) (Task.succeed ()) ]
                    )

        FocusInput _ ->
            ( model, Task.attempt FocusResult (Dom.focus "terminal-input") )

        FocusResult _ ->
            ( model, Cmd.none )

        NoOp ->
            ( model, scrollToBottom () )

        ClearOutput ->
            ( { model | output = [] }, scrollToBottom () )

        Focused focused ->
            ( { model | isFocused = focused }, Cmd.none )



-- フォーカス状態を更新


processCommand : String -> List (List (Html Msg))
processCommand cmd =
    case cmd of
        "help" ->
            [ [ span [ class "info" ] [ text "📜 Available commands:" ]
              , br [] []
              , span [ class "command" ] [ text "  help     - Show commands" ]
              , br [] []
              , span [ class "command" ] [ text "  clear    - Clear the terminal" ]
              , br [] []
              , span [ class "command" ] [ text "  echo     - Echo the given text" ]
              , br [] []
              , span [ class "command" ] [ text "  aboutme  - Display information about me" ]
              , br [] []
              , span [ class "command" ] [ text "  links    - Show links" ]
              , br [] []
              , span [ class "command" ] [ text "  blog     - List recent blog posts" ]
              ]
            ]

        "aboutme" ->
            [ [ span [ class "info" ] [ text "👨\u{200D}💻 esh2n(ShunyaEndo) / Full Stack Developer living in Tokyo, Japan." ]
              , br [] []
              , span [ class "highlight" ] [ text "I'm a professional in Golang, TypeScript, and Blockchain." ]
              , br [] []
              , span [ class "highlight" ] [ text "I have experience in Backend, Frontend, Mobile App, and Blockchain development." ]
              , br [] []
              , span [ class "highlight" ] [ text "I'm interested in Rust, WebGL, and AI." ]
              ]
            ]

        "links" ->
            [ [ span [ class "info" ] [ text "🔗 Links:" ]
              , br [] []
              , span [] [ text "  - GitHub: " ]
              , a [ href "https://github.com/esh2n", target "_blank", class "link" ] [ text "https://github.com/esh2n" ]
              , br [] []
              , span [] [ text "  - Portfolio: " ]
              , a [ href "https://esh2n.dev", target "_blank", class "link" ] [ text "https://esh2n.dev" ]
              , br [] []
              , span [] [ text "  - LinkedIn: " ]
              , a [ href "https://www.linkedin.com/in/esh2n", target "_blank", class "link" ] [ text "https://www.linkedin.com/in/esh2n" ]
              , br [] []
              , span [] [ text "  - Zenn: " ]
              , a [ href "https://zenn.dev/esh2n", target "_blank", class "link" ] [ text "https://zenn.dev/esh2n" ]
              , br [] []
              , span [] [ text "  - Email: " ]
              , a [ href "mailto:esh2n.bz@gmail.com", target "_blank", class "link" ] [ text "esh2n.bz@gmail.com" ]
              , br [] []
              , span [] [ text "  - Twitter: " ]
              , a [ href "https://twitter.com/esh2n", target "_blank", class "link" ] [ text "https://twitter.com/esh2n" ]
              , br [] []
              ]
            ]

        "blog" ->
            [ [ span [ class "info" ] [ text "📝 Recent blog posts: TBD" ] ] ]

        "" ->
            []

        _ ->
            if String.startsWith "echo " cmd then
                [ [ span [ class "echo" ] [ text (String.dropLeft 5 cmd) ] ] ]

            else
                [ [ span [ class "error" ] [ text ("❌ Command not found: " ++ cmd) ]
                  , br [] []
                  , span [ class "info" ] [ text "Type 'help' to see available commands." ]
                  ]
                ]



-- VIEW


view : Model -> Html Msg
view model =
    div [ id "vscode-terminal", class "vscode-terminal" ]
        [ div [ class "terminal-content" ]
            (List.concat
                [ List.map viewOutput model.output
                , [ Html.form [ onSubmit Submit ]
                        [ div [ class "terminal-input" ]
                            [ span [ class "prompt" ] [ text (model.currentDir ++ "> ") ]
                            , div [ class "input-container" ]
                                [ input
                                    [ type_ "text"
                                    , id "terminal-input"
                                    , value model.input
                                    , onInput Input
                                    , placeholder "Enter command..."
                                    , style "opacity" "0"
                                    , onFocus (Focused True)
                                    , onBlur (Focused False)
                                    ]
                                    []
                                , span [ class "input-text" ] [ text model.input ]
                                , span
                                    [ class
                                        ("cursor "
                                            ++ (if model.isFocused then
                                                    "focused"

                                                else
                                                    "blurred"
                                               )
                                        )
                                    ]
                                    []
                                ]
                            ]
                        ]
                  ]
                ]
            )
        ]


viewOutput : List (Html Msg) -> Html Msg
viewOutput line =
    div [ class "output-line" ] line



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    focusInput FocusInput



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }

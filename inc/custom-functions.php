<?php
function custom_url_posts_event ($urlsub, $post) {
    if ($post->post_type == 'post') {
        //$urlsub = get_the_permalink();
            
        //get venue id
        $eventId = get_post_meta($post->ID, 'event_obj', true);
       
        //get venue slug
        $eventSlug = get_post_field( 'post_name', $eventId );
        
        $eventSlugSlash = '/'.$eventSlug;
        
        if (!empty($eventSlug)) {
            $point = strrchr(rtrim($urlsub, "/"), '/');
            $urlsub = str_replace($point, "/$eventSlug$point", $urlsub);
        }
    }
    return $urlsub;
}

function wpdocs_custom_url_posts_event() {
    add_filter('post_type_link', 'custom_url_posts_event', 11, 4);
}

add_action( 'init', 'wpdocs_custom_url_posts_event' );

